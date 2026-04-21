package com.alphaReconFSE.assessment.repository;

import com.alphaReconFSE.assessment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
