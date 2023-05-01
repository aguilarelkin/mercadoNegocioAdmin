package com.mercado.app.mercadol.controllers;

import com.mercado.app.mercadol.models.dao.IClienteDao;
import com.mercado.app.mercadol.models.entity.Cliente;
import com.mercado.app.mercadol.models.entity.Factura;
import com.mercado.app.mercadol.models.entity.ItemFactura;
import com.mercado.app.mercadol.models.entity.Producto;
import com.mercado.app.mercadol.models.service.IFacturaService;
import com.mercado.app.mercadol.models.service.IOperationFacturaService;
import com.mercado.app.mercadol.models.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/factura")
public class FacturaController {

    @Autowired
    private IOperationFacturaService operationFactura;
    @Autowired
    private IClienteDao clienteDao;

    @Autowired
    private IProductoService productoService;

    @Autowired
    private IFacturaService facturaService;


    @Secured({"ROLE_CLIENT"})
    @GetMapping("/getFactura/{id}")
    public ResponseEntity<?> findFacturaClientId(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        Cliente facturaClient = null;
        List<Factura> factura = null;
        if (!id.toString().isEmpty()) {
            try {
                facturaClient = facturaService.findByClienteId(id);
                factura = facturaClient.getFacturas();
                response.put("mensaje", "El producto ha sido encontradp con éxito!");
                response.put("cliente", facturaClient);
            } catch (DataAccessException e) {
                response.put("mensaje", "Error el producto no esta disponible");
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
            }
        } else {
            response.put("mensaje", "Error el producto no esta disponible");

            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(factura, HttpStatus.OK);

    }


    @Secured({"ROLE_CLIENT"})
    @PostMapping("/create/{id}/{cantidad}")
    public synchronized ResponseEntity<?> createFacturaItem(@RequestBody Factura factura, @PathVariable Long id, @PathVariable Integer cantidad) {
        Map<String, Object> response = new HashMap<>();

        Optional<Producto> producto = null;
        Cliente facturaClient = null;
        Optional<Factura> facturaTwo = null;
        Optional<Cliente> cliente = null;

        Integer cant = 0, cantReal = 0, cantItem = 0;

        if (factura.getCliente().getId() != null) {

            try {
                cliente = clienteDao.findById(factura.getCliente().getId());

                if (!cliente.isEmpty()) {

                    facturaClient = facturaService.findByClienteId(factura.getCliente().getId());
                    if (facturaClient != null) {
                        facturaTwo = facturaService.findFacturaId(facturaClient.getFacturas().get(0).getId());
                    }
                }

                if (operationFactura.factuNewCreate(facturaClient, facturaTwo, id, cantItem, producto, cant, cantReal, cantidad, cliente, factura)) {

                    response.put("mensaje", "El producto ha sido agregado con éxito!");
                    response.put("cliente", factura);

                    cant = 0;
                    cantReal = 0;
                    cantItem = 0;

                } else {
                    response.put("mensaje", "Error cantidad de producto no esta disponible");

                    return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
                }

            } catch (DataAccessException e) {
                response.put("mensaje", "Error al realizar el insert en la base de datos");
                response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            response.put("mensaje", "Error al realizar el insert en la base de datos");

            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

    @Secured({"ROLE_CLIENT"})
    @GetMapping("/shopcart/{id}")
    public ResponseEntity<?> findFactura(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        List<Factura> factura;

        try {
            factura = facturaService.fetchFacturaByIdWithClienteWhithItemFacturaWithProducto(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (factura.isEmpty()) {
            response.put("mensaje", "No existe el Producto ".concat(String.valueOf(id)) + " en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }


        return new ResponseEntity<>(factura, HttpStatus.OK);

    }

    //ROLE_CLIENT
    @Secured({"ROLE_CLIENT"})
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFactura(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            facturaService.deleteFactura(id);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar la factura de la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Compra finalizada con exito");

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }



}
