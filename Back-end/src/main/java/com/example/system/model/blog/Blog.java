package com.example.system.model.blog;

import com.example.system.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

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
    @Column(nullable = false, columnDefinition = "varchar(10000)")
    private String blogContent;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date createDay;
    @Column(columnDefinition = "varchar(500)")
    private String imgPath;
    @Column(nullable = false, columnDefinition = "varchar(200)")
    private int blogType; // 1: Cẩm Nang Xây Dựng // 2: Thiết Kế Kiến Trúc
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
