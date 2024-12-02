package com.team3.E_Learning_Platform.repository;


import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.team3.E_Learning_Platform.model.User;

public interface UserRepository extends CrudRepository<User, Integer>
{
	
    public User findByEmail(String email);
	
	public User findByUsername(String username);

	public User  findByUserid(String  userid);

	public User findByEmailAndPassword(String email, String password);
	
	public List<User> findProfileByEmail(String email);
	
}