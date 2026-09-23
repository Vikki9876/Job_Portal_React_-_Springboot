package com.jobportal.entity;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import com.jobportal.dto.NotificationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="notification")
public class Notification {
	
	private Long id;
	private Long userId;
	private String message;
	private String action;
	private String route;
	private NotificationStatus status;
   private LocalDateTime timeStamp ;  

   public Notification toEntity() {
		return new Notification(this.id ,this.userId,this.message,this.action ,this.route ,this.status 
				, this.timeStamp );
			 }
   
}
