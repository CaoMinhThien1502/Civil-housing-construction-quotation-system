package com.example.system.repository.user;

import com.example.system.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Override
    List<User> findAll();

    List<User> findByRole(String role);

    User findByUserName(String username);
    Optional<User> findByEmail(String email);
}
