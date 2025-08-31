package com.wain.wainvotingbackend.service.impl;

import com.wain.wainvotingbackend.dto.request.CategoryRequest;
import com.wain.wainvotingbackend.dto.response.CategoryDetailResponse;
import com.wain.wainvotingbackend.dto.response.CategoryResponse;
import com.wain.wainvotingbackend.entity.Category;
import com.wain.wainvotingbackend.enums.ErrorCode;
import com.wain.wainvotingbackend.exception.AppException;
import com.wain.wainvotingbackend.mapper.CategoryMapper;
import com.wain.wainvotingbackend.repository.CategoryRepository;
import com.wain.wainvotingbackend.service.ICategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService implements ICategoryService {

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public CategoryResponse save(CategoryRequest categoryRequest) {
        Category category = categoryMapper.toCategory(categoryRequest);

        category = categoryRepository.save(category);

        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_FOUND));

        categoryMapper.updateCategory(category, categoryRequest);

        category = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);

    }

    @Override
    public CategoryDetailResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.DATA_NOT_FOUND));

        return categoryMapper.toCategoryDetailResponse(category);
    }
}
