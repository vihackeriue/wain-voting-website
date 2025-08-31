package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.request.CategoryRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.CategoryDetailResponse;
import com.wain.wainvotingbackend.dto.response.CategoryResponse;
import com.wain.wainvotingbackend.service.ICategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    ICategoryService categoryService;

    @PostMapping("/create")
    public ApiResponse<CategoryResponse> create(@RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryService.save(request))
                .build();

    }
    @PutMapping("/update/{id}")
    public ApiResponse<CategoryResponse> update(@PathVariable Long id, @RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryService.update(id, request))
                .build();
    }
    @GetMapping("/list")
    public ApiResponse<List<CategoryResponse>> list() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .data(categoryService.getAllCategories())
                .build();
    }
    @DeleteMapping("/delete/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        String message = "Category deleted successfully";
        return ApiResponse.<Void>builder()
                .message(message)
                .build();
    }
    @GetMapping("/detail/{id}")
    public ApiResponse<CategoryDetailResponse> getDetail(@PathVariable Long id) {
        return ApiResponse.<CategoryDetailResponse>builder()
                .data(categoryService.getCategoryById(id))
                .build();
    }


}
