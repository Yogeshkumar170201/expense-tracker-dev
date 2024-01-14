package com.expense.tracker.expense.tracker.backend.auth;

import com.expense.tracker.expense.tracker.backend.events.RegistrationEvent;
import com.expense.tracker.expense.tracker.backend.models.User;
import com.expense.tracker.expense.tracker.backend.service.AuthenticationService;
import com.expense.tracker.expense.tracker.backend.service.RegistrationVerificationService;
import com.expense.tracker.expense.tracker.backend.utils.Response;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    private final RegistrationVerificationService regVerService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<Response> register(
            @RequestBody RegisterRequest request,
            final HttpServletRequest req
            ){
        var res = authenticationService.register(request, req);
        return ResponseEntity.ok(res);
    }



    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticateRequest request
    ){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/verifyRegistration")
    @CrossOrigin(origins = "http://localhost:3000")
    public String verifyToken(@RequestParam("token") String token){
        String result = regVerService.validateToken(token);
        if(result.equalsIgnoreCase("valid")){
            return "User Verification Successfully";
        }else{
            return "Bad user";
        }
    }

    @PutMapping("/forgot-password")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Response> forgotPassword(@RequestBody PasswordChangeRequest request, final HttpServletRequest req){
        var res = authenticationService.updatePassword(request, req);
        return ResponseEntity.ok(res);
    }

}
