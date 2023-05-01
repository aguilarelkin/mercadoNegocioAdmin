package com.mercado.app.mercadol.models.service;

import com.mercado.app.mercadol.models.dao.IClienteDao;
import com.mercado.app.mercadol.models.dao.IFacturaDao;
import com.mercado.app.mercadol.models.dao.IItemFacturaDao;
import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Factura;
import com.mercado.app.mercadol.models.entity.ItemFactura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacturaServiceImpl implements IFacturaService{

    @Autowired
    private IItemFacturaDao iItemFacturaDao;
    @Autowired
    private IClienteDao clienteDao;
    @Autowired
    private IFacturaDao facturaDao;

    @Override
    public List<Factura> fetchFacturaByIdWithClienteWhithItemFacturaWithProducto(Long id) {
        return facturaDao.fetchByIdWithClienteWhithItemFacturaWithProducto(id);
    }

    @Override
    public Factura saveFactura(Factura factura) {
        return facturaDao.save(factura);
    }

    @Override
    public Cliente findByClienteId(Long id) {
        return clienteDao.fetchByIdWithFactura(id);
    }

    @Override
    public Optional<Factura> findFacturaId(Long id) {
        return facturaDao.findById(id);
    }

    @Override
    public void deleteFactura(Long id) {
        facturaDao.deleteById(id);
    }


}
