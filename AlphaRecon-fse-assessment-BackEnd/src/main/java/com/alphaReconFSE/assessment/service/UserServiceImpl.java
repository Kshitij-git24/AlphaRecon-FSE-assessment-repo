package com.alphaReconFSE.assessment.service;

import com.alphaReconFSE.assessment.dto.UserRequest;
import com.alphaReconFSE.assessment.dto.UserResponse;
import com.alphaReconFSE.assessment.exception.UserNotFoundException;
import com.alphaReconFSE.assessment.model.User;
import com.alphaReconFSE.assessment.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserResponse> getAllUsers() {
        log.info("Fetching all users");
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public UserResponse createUser(UserRequest request) {
        log.info("Creating user with email: {}", request.getEmail());
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .note(request.getNote())
                .build();

        return toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {
        log.info("Updating user with id: {}", id);
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        existingUser.setName(request.getName());
        existingUser.setEmail(request.getEmail());
        existingUser.setNote(request.getNote());

        return toResponse(userRepository.save(existingUser));
    }

    @Override
    public void deleteUser(Long id) {
        log.info("Deleting user with id: {}", id);
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        userRepository.delete(existingUser);
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .note(user.getNote())
                .build();
    }
}
