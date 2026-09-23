package com.jobportal.service;


import java.util.List;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.exception.JobPortalException;

public interface ProfileService {
	
 public ProfileDTO   getProfile(Long id)throws JobPortalException ;
 public ProfileDTO   updateProfile(ProfileDTO profileDTO )throws JobPortalException ;
 public List<ProfileDTO> getAllProfiles();
 public Long createProfile(String name, String email) throws JobPortalException;
 


}

