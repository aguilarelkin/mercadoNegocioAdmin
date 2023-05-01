package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.dao.IClienteDao;
import com.mercado.app.mercadol.models.dao.IRoleDao;
import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteServiceImpl implements IClienteService, IRoleService, UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(ClienteServiceImpl.class);
    @Autowired
    private IRoleDao roleDao;

    @Autowired
    private IClienteDao clienteDao;

    @Override
    public Cliente findClientEmail(String email) {

        return clienteDao.findByEmail(email);
    }

    @Override
    public Cliente createClient(Cliente cliente) {
        return clienteDao.save(cliente);
    }

    @Override
    public Cliente updateClient(Cliente cliente) {
        return clienteDao.save(cliente);
    }

    @Override
    public Optional<Cliente> findClientId(Long id) {
        return clienteDao.findById(id);
    }

    @Override
    public Optional<Role> findRole(Long id) {
        return roleDao.findById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        Cliente cliente = clienteDao.findByEmail(username);

        if (cliente == null) {
            logger.error("Error en el login: no existe el cliente en el sistema!");
            throw new UsernameNotFoundException("Error en el login: no existe el usuario en el sistema!");
        }

        List<GrantedAuthority> authorities = cliente.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getNombre()))
                .peek(authority -> logger.info("Role: " + authority.getAuthority()))
                .collect(Collectors.toList());

        return new User(cliente.getEmail(), cliente.getPassword(), cliente.getEnable(), true, true, true, authorities);
    }
}
