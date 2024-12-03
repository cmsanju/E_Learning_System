package com.team3.E_Learning_Platform.repository;


import org.springframework.data.repository.CrudRepository;
import java.util.List;
import com.team3.E_Learning_Platform.model.Chapter;

public interface ChapterRepository extends CrudRepository<Chapter, Integer>
{
	public List<Chapter> findByCoursename(String Coursename);
	
}