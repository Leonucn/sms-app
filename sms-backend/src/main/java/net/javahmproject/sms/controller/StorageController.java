package net.javahmproject.sms.controller;

import lombok.AllArgsConstructor;
import net.javahmproject.sms.dto.StorageDto;
import net.javahmproject.sms.service.StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/storages")
public class StorageController {

    private StorageService storageService;

    // Build Add Storage REST API
    @PostMapping
    public ResponseEntity<StorageDto> createStorage(@RequestBody StorageDto storageDto){
        StorageDto savedStorage = storageService.createStorage(storageDto);
        return new ResponseEntity<>(savedStorage, HttpStatus.CREATED);
    }

    //Build Get Storage REST API
    @GetMapping("{id}")
    public ResponseEntity<StorageDto> getStorageById(@PathVariable("id") Long storageId){
        StorageDto storageDto = storageService.getStorageById(storageId);
        return ResponseEntity.ok(storageDto);
    }

    //Build Get Storage By Name Or Category REST API
    @GetMapping("/")
    public ResponseEntity<List<StorageDto>> getStorageByNameOrCategory(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category) {
        List<StorageDto> storages = storageService.getStorageByNameOrCategory(name, category);
        return ResponseEntity.ok(storages);
    }

    //Build Get All Storages REST API
    @GetMapping
    public ResponseEntity<List<StorageDto>> getAllStorage(){
        List<StorageDto> storages = storageService.getAllStorages();
        return ResponseEntity.ok(storages);
    }

    // Build Update Storage REST API
    @PutMapping("{id}")
    public ResponseEntity<StorageDto> updateStorage(@PathVariable("id") Long storageId,
                                                    @RequestBody StorageDto updatedStorage){
        StorageDto storageDto = storageService.updateStorage(storageId, updatedStorage);
        return ResponseEntity.ok(storageDto);
    }

    // Build Delete Storage REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStorage(@PathVariable("id") Long storageId){
        storageService.deleteStorage(storageId);
        return ResponseEntity.ok("Storage deleted successfully!");
    }
}
