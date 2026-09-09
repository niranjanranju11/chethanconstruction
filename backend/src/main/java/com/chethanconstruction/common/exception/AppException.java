package com.chethanconstruction.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AppException extends RuntimeException {
    private final HttpStatus status;
    private final ErrorCode code;

    public AppException(String message, HttpStatus status, ErrorCode code) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public AppException(String message, HttpStatus status, ErrorCode code, Throwable cause) {
        super(message, cause);
        this.status = status;
        this.code = code;
    }

    public static AppException badRequest(String message) {
        return new AppException(message, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
    }

    public static AppException unauthorized(String message) {
        return new AppException(message, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }

    public static AppException forbidden(String message) {
        return new AppException(message, HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN);
    }

    public static AppException conflict(String message) {
        return new AppException(message, HttpStatus.CONFLICT, ErrorCode.CONFLICT);
    }
}
