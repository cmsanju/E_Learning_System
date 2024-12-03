package com.team3.E_Learning_Platform.model;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
@Entity
@Data
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String coursename;
	private String courseid;
	private String enrolleddate;
	private String instructorname;
	private String instructorinstitution;
	private String enrolledcount;
	private String youtubeurl;
	private String websiteurl;
	private String coursetype;
	private String skilllevel;
	private String language;
	private String description;

	public Course() {
		super();
	}

	public Course(int id, String coursename, String courseid, String enrolleddate, String instructorname, String instructorinstitution, String enrolledcount, String youtubeurl, String websiteurl, String coursetype, String skilllevel, String language, String description) {
		super();
		this.id = id;
		this.coursename = coursename;
		this.courseid = courseid;
		this.enrolleddate = enrolleddate;
		this.instructorname = instructorname;
		this.instructorinstitution = instructorinstitution;
		this.enrolledcount = enrolledcount;
		this.youtubeurl = youtubeurl;
		this.websiteurl = websiteurl;
		this.coursetype = coursetype;
		this.skilllevel = skilllevel;
		this.language = language;
		this.description = description;
	}
}