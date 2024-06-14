package com.backend.domain.product;

import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
public class Product {
    private Integer id;
    private Integer userId;
    private String title;
    private String category;
    private String startPrice;
    private Boolean status; //상품 판매 상태
    private String content;
    private LocalDateTime startTime; //게시글 등록 시간
    private LocalDateTime endTime;
    private int viewCount;
    private Boolean reviewStatus;
    private List<ProductFile> productFileList;
    private Integer numberOfJoin;
    private String userNickName;

    public String getTimeFormat() {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(startTime, now);

        if (duration.getSeconds() < 60) {
            return "방금 전";
        } else if (duration.toMinutes() < 60) {
            return duration.toMinutes() + "분 전";
        } else if (duration.toHours() < 24) {
            return duration.toHours() + "시간 전";
        } else if (duration.toDays() < 7) {
            return duration.toDays() + "일 전";
        } else {
            Period period = Period.between(startTime.toLocalDate(), now.toLocalDate());
            if (period.getMonths() > 0) {
                return period.getMonths() + "달 전";
            } else {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
                return startTime.format(formatter);
            }
        }
    }

    public String getEndTimeFormat() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd HH시 mm분 까지");
        return endTime.format(formatter);
    }

    public String getEndTimeDetailsFormat() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 까지");
        return endTime.format(formatter);
    }

    public String getStartTimeFormat() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
        return startTime.format(formatter);
    }
}