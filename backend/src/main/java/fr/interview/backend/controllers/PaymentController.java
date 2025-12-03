package fr.interview.backend.controllers;

import fr.interview.backend.services.StripeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final StripeService stripeService;

    public PaymentController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/checkout")
    public String createCheckout(@RequestParam long amount) throws Exception {
        String successUrl = "http://localhost:3000/success";
        String cancelUrl = "http://localhost:3000/cancel";
        return stripeService.createCheckoutSession(amount, successUrl, cancelUrl);
    }
}

