package com.wain.wainvotingbackend.controller;

import com.wain.wainvotingbackend.dto.request.CategoryRequest;
import com.wain.wainvotingbackend.dto.response.ApiResponse;
import com.wain.wainvotingbackend.dto.response.CategoryDetailResponse;
import com.wain.wainvotingbackend.dto.response.CategoryResponse;
import com.wain.wainvotingbackend.dto.response.PollListResponse;
import com.wain.wainvotingbackend.service.ICategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    ICategoryService categoryService;

    @PostMapping("")
    public ApiResponse<CategoryResponse> create(@RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryService.save(request))
                .build();

    }
    @PutMapping("/{id}")
    public ApiResponse<CategoryResponse> update(@PathVariable Long id, @RequestBody CategoryRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryService.update(id, request))
                .build();
    }
    @GetMapping("")
    public ApiResponse<List<CategoryResponse>> list(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "limit", required = false) Integer limit) {
        if(page != null && limit != null){
            Pageable pageable = PageRequest.of(page-1, limit);

            return ApiResponse.<List<CategoryResponse>>builder()
                    .page(page)
                    .totalPages((int) Math.ceil((double) (categoryService.totalItem())/ limit))
                    .data(categoryService.findAll(pageable))
                    .build();
        }

        return ApiResponse.<List<CategoryResponse>>builder()
                .data(categoryService.findAll())
                .build();
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        String message = "Category deleted successfully";
        return ApiResponse.<Void>builder()
                .message(message)
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<CategoryDetailResponse> getDetail(@PathVariable Long id) {
        return ApiResponse.<CategoryDetailResponse>builder()
                .data(categoryService.getCategoryById(id))
                .build();
    }


}
