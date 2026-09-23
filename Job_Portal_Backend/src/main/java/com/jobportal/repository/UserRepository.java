package com.jobportal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jobportal.entity.User;

public interface UserRepository extends MongoRepository<User,Long> {

	@Query("{ 'email' : ?0 }")
	public Optional<User> findByEmail(String email) ;
}
