package com.example.system.controller;

import com.example.system.dto.blog.BlogDto;
import com.example.system.model.blog.Blog;
import com.example.system.service.blog.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;
    @GetMapping("list")
    public ResponseEntity<List<Blog>> getListBlog(){
        List<Blog> blogList = blogService.getListBlog();
        return ResponseEntity.ok(blogList);
    }
    @GetMapping("/getById")
    public ResponseEntity<Blog> getBlogById(@RequestParam Long id){
        Blog blog = blogService.getBlogById(id);
        return ResponseEntity.ok(blog);
    }
    @PostMapping("create")
    public ResponseEntity<Boolean> createBlog(@RequestBody BlogDto blog){
        boolean createBlog = blogService.createBlog(blog);
        return ResponseEntity.ok(createBlog);
    }
}
