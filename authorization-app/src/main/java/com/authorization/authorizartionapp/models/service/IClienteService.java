package com.authorization.authorizartionapp.models.service;

import com.authorization.authorizartionapp.models.entity.Cliente;

public interface IClienteService {

    public Cliente findByEmailCliente(String email) ;

}
