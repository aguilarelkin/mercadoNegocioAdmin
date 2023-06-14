package com.authorization.authorizartionapp.models.dao;

import com.authorization.authorizartionapp.models.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClienteDao extends JpaRepository<Cliente, Long> {

    Cliente findByEmail(String email);

}
