package com.mercado.app.mercadol.controllers;

import com.mercado.app.mercadol.models.entity.Producto;
import com.mercado.app.mercadol.models.service.IProductoService;
import com.mercado.app.mercadol.models.service.IUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

//      @CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/v1/mercado")
public class ProductoMController {

    @Autowired
    private IUploadService uploadService;
    @Autowired
    private IProductoService productoService;

    @GetMapping("/products")
    public ResponseEntity<?> getProductos(){

        List<Producto> producto;

        Map<String, Object> response = new HashMap<>();

        try {
            producto= productoService.findProductos();


        }catch (DataAccessException e){
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(producto.isEmpty()) {
            response.put("mensaje", "No existe Productos en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<Producto>>(producto, HttpStatus.OK);
    }

    @GetMapping("/products/page/{page}")
    public Page<Producto> getProductoPage(@PathVariable Integer page) {

        return productoService.findAllProduct(PageRequest.of(page, 5));
    }


    @Secured({"ROLE_ADMIN"})
    @GetMapping("/product/{id}")
    public ResponseEntity<?>  getProduct(@PathVariable Long id){
        Optional<Producto> producto;
        Map<String, Object> response = new HashMap<>();
        try {
            producto = productoService.findProduct(id);

        }catch (DataAccessException e){
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (producto.isEmpty()){
            response.put("mensaje", "No existe el Producto ".concat(id.toString())+" en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Optional<Producto>>(producto, HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/product/p/{nombre}")
    public ResponseEntity<?>  getProductName(@PathVariable String nombre){
        Producto producto;
        Map<String, Object> response = new HashMap<>();
        try {
            producto = productoService.findProductName(nombre);

        }catch (DataAccessException e){
            response.put("mensaje", "Error al realizar la consulta en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (producto == null){
            response.put("mensaje", "No existe el Producto ".concat(nombre)+" en la base de datos!");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Producto>(producto, HttpStatus.OK);
    }

    // @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping("/uploads/img/{nombreFoto:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

        Resource recurso = null;

        try {
            recurso = uploadService.cargar(nombreFoto);
            System.out.println(recurso);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
        return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
    }

}
