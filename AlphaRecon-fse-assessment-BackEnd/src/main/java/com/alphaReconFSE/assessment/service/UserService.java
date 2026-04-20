package com.alphaReconFSE.assessment.service;

import com.alphaReconFSE.assessment.dto.UserRequest;
import com.alphaReconFSE.assessment.dto.UserResponse;
import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse createUser(UserRequest request);

    UserResponse updateUser(Long id, UserRequest request);

    void deleteUser(Long id);
}
