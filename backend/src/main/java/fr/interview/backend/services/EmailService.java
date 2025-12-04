package fr.interview.backend.services;

import fr.interview.backend.entities.Commande;
import fr.interview.backend.entities.CommandeProduit;
import fr.interview.backend.entities.ExtraCommande;
import fr.interview.backend.entities.Garniture;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

// EmailService.java (simple for now)
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendVerificationEmail(String to, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Activate your account");
        message.setText("Click here to activate: " + link);
        mailSender.send(message);
    }

    @Async
    public void sendOrderRecapEmail(Commande commande, String to, String customerName) throws MessagingException {
        if (to == null || to.isBlank()) {
            throw new IllegalStateException("Customer email is missing");
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
        helper.setTo(to);
        helper.setSubject("Récapitulatif de votre commande #" + commande.getId());

        StringBuilder html = new StringBuilder();
        html.append("<html><body style='font-family: Arial, sans-serif;'>");
        html.append("<h2>Merci pour votre commande, ").append(commande.getCustomer().getUsername()).append("!</h2>");
        html.append("<p>Voici le récapitulatif de votre commande :</p>");

        html.append("<table style='width:100%; border-collapse: collapse;'>");
        html.append("<thead><tr style='background:#f2f2f2;'><th style='padding:8px; text-align:left;'>Produit</th><th style='padding:8px;'>Prix</th></tr></thead>");
        html.append("<tbody>");

        double total = 0.0;

        for (CommandeProduit cp : commande.getCommandeProduits()) {
            double prodPrice = cp.getProduit().getPrix();
            html.append("<tr>");
            html.append("<td style='padding:8px;'>").append(cp.getProduit().getNom());

            if (cp.getGarnitures() != null && !cp.getGarnitures().isEmpty()) {
                html.append("<br/><small>Garnitures: ")
                        .append(cp.getGarnitures().stream().map(Garniture::getNom).collect(Collectors.joining(", ")))
                        .append("</small>");
                prodPrice += cp.getGarnitures().stream().mapToDouble(Garniture::getPrix).sum();
            }

            html.append("</td>");
            html.append("<td style='padding:8px; text-align:right;'>").append(String.format("%.2f €", prodPrice)).append("</td>");
            html.append("</tr>");
            total += prodPrice;
        }

        // Extras
        if (commande.getExtras() != null && !commande.getExtras().isEmpty()) {
            for (ExtraCommande extra : commande.getExtras()) {
                html.append("<tr>");
                html.append("<td style='padding:8px;'>").append(extra.getNom()).append(" (Extra)</td>");
                html.append("<td style='padding:8px; text-align:right;'>").append(String.format("%.2f €", extra.getPrix())).append("</td>");
                html.append("</tr>");
                total += extra.getPrix();
            }
        }

        html.append("</tbody>");
        html.append("<tfoot>");
        html.append("<tr style='font-weight:bold;'><td style='padding:8px;'>Total</td><td style='padding:8px; text-align:right;'>")
                .append(String.format("%.2f €", total))
                .append("</td></tr>");
        html.append("</tfoot>");
        html.append("</table>");

        html.append("<p>Nous vous remercions pour votre confiance et espérons vous revoir bientôt !</p>");
        html.append("</body></html>");

        helper.setText(html.toString(), true);

        mailSender.send(message);
    }
}
