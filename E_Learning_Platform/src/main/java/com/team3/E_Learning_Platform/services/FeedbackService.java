package com.team3.E_Learning_Platform.services;
import com.team3.E_Learning_Platform.model.Feedback;
import com.team3.E_Learning_Platform.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByCourseId(String courseId) {
        return feedbackRepository.findByCourseId(courseId);
    }
}
