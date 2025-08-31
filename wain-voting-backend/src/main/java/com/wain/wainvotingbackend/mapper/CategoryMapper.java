package com.wain.wainvotingbackend.mapper;

import com.wain.wainvotingbackend.dto.request.CategoryRequest;
import com.wain.wainvotingbackend.dto.response.CategoryDetailResponse;
import com.wain.wainvotingbackend.dto.response.CategoryResponse;
import com.wain.wainvotingbackend.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {PollMapper.class})
public interface CategoryMapper {
    Category toCategory(CategoryRequest categoryRequest);

    CategoryResponse toCategoryResponse(Category category);


//    @Mapping(target = "polls", ignore = true)
    void updateCategory(@MappingTarget Category category, CategoryRequest categoryRequest);

    @Mapping(source = "polls", target = "polls")
    CategoryDetailResponse toCategoryDetailResponse(Category category);
}
