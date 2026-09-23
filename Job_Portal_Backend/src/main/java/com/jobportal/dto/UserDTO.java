package com.jobportal.dto;


import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;

import com.jobportal.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="users")
public class UserDTO {

	public Long id ;
	@NotBlank(message="{user.name.absent}")
	public String name ;
	@NotBlank(message="{user.email.absent}")
	@Email(message="{user.email.invalid}")
	public String email;
	@NotBlank(message="{user.password.absent}")
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$" , message="{user.password.invalid}" )
	public String password ;
	private AccountType accountType ; 
	private Long profileId ;
	
	public User toEntity()
	{
	return new User(this.id , this.name ,this.email ,this.password ,this.accountType, this.profileId ) ;
	}

	
	
}
