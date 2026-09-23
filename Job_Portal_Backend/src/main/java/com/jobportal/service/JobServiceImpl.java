package com.jobportal.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.ApplicationStatus;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.JobStatus;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.JobRepository;
import com.jobportal.utility.Utilities;

@Service("jobService")
public class JobServiceImpl implements JobService {

	@Autowired
	private JobRepository jobRepository ;

	@Autowired
	private NotificationService notificationService;
	
	@Override
	public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
	    if (jobDTO.getId() == 0) {
	        jobDTO.setId(Utilities.getNextSequenceId("jobs"));
	        jobDTO.setPostTime(LocalDateTime.now());
	        NotificationDTO notiDTO=new NotificationDTO() ;
	 	   notiDTO.setAction("Job Posted");
	 	   notiDTO.setMessage(" job Posted Succesfully for "+jobDTO.getJobTitle()+" "+jobDTO.getCompany()) ;
	 	   notiDTO.setUserId(jobDTO.getPostedBy());
	 	    notiDTO.setRoute("/posted-jobs/"+jobDTO.getId());
	 	    notificationService.sendNotification(notiDTO) ;
	 	    
	      }
	 	    else {
	        Job job = jobRepository.findById(jobDTO.getId()).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
	        
          if (job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED)) {
	            jobDTO.setPostTime(LocalDateTime.now());
	        } else {
	            jobDTO.setPostTime(job.getPostTime());
	        }
	    }
	       return jobRepository.save(jobDTO.toEntity()).toDTO();
	}
	
	
	@Override
	public List<JobDTO> getAllJobs() throws  JobPortalException {
		return jobRepository.findAll().stream().map((x)->x.toDTO()).toList(); 
	}
	
	@Override
	public JobDTO getJob(Long id) throws JobPortalException {
		return  jobRepository.findById(id).orElseThrow(()-> new 
				JobPortalException("JOB_NOT_FOUND")).toDTO() ;
	}
	
	@Override
	public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
	    Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
	     if (job.getApplicants() == null) {
	        job.setApplicants(new ArrayList<>());
	    }
	    boolean alreadyApplied = job.getApplicants().stream()
	            .anyMatch(x -> java.util.Objects.equals(x.getApplicantId(), applicantDTO.getApplicantId()));
           if (alreadyApplied) {
	        throw new JobPortalException("JOB_APPLIED_ALREADY");
	    }
        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
	    Applicant applicant = applicantDTO.toEntity();
	    job.getApplicants().add(applicant);
	    jobRepository.save(job);
	}

	@Override
	public List<JobDTO> getJobsPostedBy(Long id) {
		return jobRepository.findByPostedBy(id).stream().map((x)->x.toDTO()).toList() ; 
	}

	@Override
	public void changeAppStatus(Application application) throws JobPortalException {
	Job job=jobRepository.findById(application.getId()).orElseThrow(()->new 
			JobPortalException("JOB_NOT_FOUND")) ;
	List<Applicant>applicants=job.getApplicants().stream().map((x)->{
	if(application.getApplicantId()==x.getApplicantId()) {
			x.setApplicationStatus(application.getApplicationStatus());
		if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) ;	{		
		x.setInterviewTime(application.getInterviewTime());
	   NotificationDTO notiDTO=new NotificationDTO() ;
	   notiDTO.setAction("Interview Scheduled");
	   notiDTO.setMessage("Interview Scheduled for job id;"+application.getId());
	   notiDTO.setUserId(application.getApplicantId());
	    notiDTO.setRoute("/job-history");
	    try {
			notificationService.sendNotification(notiDTO);
		} catch (JobPortalException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		}
	}	return x;
	}).toList();
	job.setApplicants(applicants);
	jobRepository.save(job);
		
	}

}
