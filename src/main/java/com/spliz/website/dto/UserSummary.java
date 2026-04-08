package com.spliz.website.dto;

import com.spliz.website.entity.Role;
import com.spliz.website.entity.User;

public record UserSummary(
        Long id,
        String username,
        Role role
) {
    public static UserSummary from(User user) {
        return new UserSummary(user.getId(), user.getUsername(), user.getRole());
    }
}
