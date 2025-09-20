package com.wain.wainvotingbackend.service;

import com.wain.wainvotingbackend.dto.request.CategoryRequest;
import com.wain.wainvotingbackend.dto.response.CategoryDetailResponse;
import com.wain.wainvotingbackend.dto.response.CategoryResponse;

import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoryService {

    CategoryResponse save(CategoryRequest categoryRequest);
    CategoryResponse update(Long id, CategoryRequest categoryRequest);

    List<CategoryResponse> findAll();

    List<CategoryResponse> findAll(Pageable pageable);

    void delete(Long id);
    CategoryDetailResponse getCategoryById(Long id);

    int totalItem();

}
