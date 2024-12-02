package com.team3.E_Learning_Platform.repository;


import com.team3.E_Learning_Platform.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByCourseId(String courseId);
}
