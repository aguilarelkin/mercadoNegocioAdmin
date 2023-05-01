package com.mercado.app.mercadol.auth;

import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class InfoAdicionalToken implements TokenEnhancer {

    @Autowired
    private IClienteService clienteService;


    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {

        Cliente cliente = clienteService.findClientEmail(oAuth2Authentication.getName());

        //Usuario usuario = usuarioService.findByUsername(oAuth2Authentication.getName());

        Map<String, Object> info = new HashMap<>();
        info.put("info_adicional", "Hola que tal".concat(oAuth2Authentication.getName()));

        info.put("id", cliente.getId());
        info.put("nombre", cliente.getNombre());
        info.put("apellido", cliente.getApellido());
        info.put("email", cliente.getEmail());

        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(info);

        return oAuth2AccessToken;
    }
}
