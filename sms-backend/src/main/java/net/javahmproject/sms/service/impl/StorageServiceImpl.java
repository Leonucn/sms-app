package net.javahmproject.sms.service.impl;

import lombok.AllArgsConstructor;
import net.javahmproject.sms.dto.StorageDto;
import net.javahmproject.sms.entity.Storage;
import net.javahmproject.sms.exception.ResourceNotFoundException;
import net.javahmproject.sms.mapper.StorageMapper;
import net.javahmproject.sms.repository.StorageRepository;
import net.javahmproject.sms.service.StorageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StorageServiceImpl implements StorageService {

    private StorageRepository storageRepository;

    @Override
    public StorageDto createStorage(StorageDto storageDto) {

        Storage storage = StorageMapper.mapToStorage(storageDto);
        Storage savedStorage = storageRepository.save(storage);

        return StorageMapper.mapToStorageDto(savedStorage);
    }

    @Override
    public StorageDto getStorageById(Long storageId) {
        Storage storage = storageRepository.findById(storageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Storage is not exists with given id : " + storageId));

        return StorageMapper.mapToStorageDto(storage);
    }

    @Override
    public List<StorageDto> getStorageByNameOrCategory(String storageName, String storageCategory) {
        List<Storage> storages = storageRepository.findByNameContainingOrCategoryIs(storageName, storageCategory);

        // Return an empty list if no storages are found
        return storages.stream()
                .map(StorageMapper::mapToStorageDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<StorageDto> getAllStorages() {
        List<Storage> storages = storageRepository.findAll();
        return storages.stream().map((storge) -> StorageMapper.mapToStorageDto(storge))
                .collect(Collectors.toList());
    }

    @Override
    public StorageDto updateStorage(Long storageId, StorageDto updatedStorage) {

        Storage storage = storageRepository.findById(storageId).orElseThrow(
                () -> new ResourceNotFoundException("Storage is not exists with given id : " + storageId)
        );

        storage.setName(updatedStorage.getName());
        storage.setCategory(updatedStorage.getCategory());
        storage.setQuantity(updatedStorage.getQuantity());
        storage.setPurchaseDate(updatedStorage.getPurchaseDate());

        Storage updatedStorageObj = storageRepository.save(storage);

        return StorageMapper.mapToStorageDto(updatedStorageObj);
    }

    @Override
    public void deleteStorage(Long storageId) {

        Storage storage = storageRepository.findById(storageId).orElseThrow(
                () -> new ResourceNotFoundException("Storage is not exists with given id : " + storageId)
        );

        storageRepository.deleteById(storageId);
    }
}
