package com.wain.wainvotingbackend.service;

import com.wain.wainvotingbackend.dto.request.CategoryRequest;
import com.wain.wainvotingbackend.dto.response.CategoryDetailResponse;
import com.wain.wainvotingbackend.dto.response.CategoryResponse;

import java.util.List;

public interface ICategoryService {

    CategoryResponse save(CategoryRequest categoryRequest);
    CategoryResponse update(Long id, CategoryRequest categoryRequest);
    List<CategoryResponse> getAllCategories();

    void delete(Long id);
    CategoryDetailResponse getCategoryById(Long id);


}
