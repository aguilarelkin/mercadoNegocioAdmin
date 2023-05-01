package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.entity.Cliente;

import java.util.Optional;


public interface IClienteService {

    public Cliente findClientEmail(String email);

    public Cliente createClient(Cliente cliente);

    public Cliente updateClient(Cliente cliente);

    public Optional<Cliente> findClientId(Long id);
}
