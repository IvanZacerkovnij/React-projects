using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Exceptions;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var isValidationError = exception is ValidationException;
        var isNotFound = exception is KeyNotFoundException;
        var statusCode = isValidationError
            ? StatusCodes.Status400BadRequest
            : isNotFound ? StatusCodes.Status404NotFound : StatusCodes.Status500InternalServerError;

        if (!isValidationError && !isNotFound)
        {
            logger.LogError(exception, "Unhandled exception for {Method} {Path}. TraceId: {TraceId}",
                httpContext.Request.Method, httpContext.Request.Path, httpContext.TraceIdentifier);
        }

        var problem = new ProblemDetails
        {
            Status = statusCode,
            Title = isValidationError ? "Помилка валідації" : isNotFound ? "Не знайдено" : "Внутрішня помилка сервера",
            Detail = isValidationError || isNotFound ? exception.Message : "Сталася помилка. Спробуйте пізніше.",
            Instance = httpContext.Request.Path
        };
        problem.Extensions["traceId"] = httpContext.TraceIdentifier;

        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(problem, options: null,
            contentType: "application/problem+json", cancellationToken: cancellationToken);
        return true;
    }
}
