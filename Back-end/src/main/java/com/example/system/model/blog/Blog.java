package com.example.system.model.blog;

import com.example.system.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "blog")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blogId;
    @Column(nullable = false, columnDefinition = "varchar(200)")
    private String blogName;
    @Column(nullable = false, columnDefinition = "varchar(2000)")
    private String blogContent;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate createDay;
    @Column(columnDefinition = "varchar(500)")
    private String imgPath;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
