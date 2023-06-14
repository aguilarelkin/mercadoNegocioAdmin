package com.authorization.authorizartionapp.models.service;

import com.authorization.authorizartionapp.models.dao.IClienteDao;
import com.authorization.authorizartionapp.models.entity.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl implements IClienteService {

    @Autowired
    private IClienteDao clienteDao;

    @Override
    public Cliente findByEmailCliente(String email) {
        return clienteDao.findByEmail(email);
    }
}
