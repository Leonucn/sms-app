package net.javahmproject.sms.service;

import net.javahmproject.sms.dto.StorageDto;

import java.util.List;

public interface StorageService {
    StorageDto createStorage(StorageDto storageDto);

    StorageDto getStorageById(Long storageId);

    List<StorageDto> getStorageByNameOrCategory(String storageName, String storageCategory);

    List<StorageDto> getAllStorages();

    StorageDto updateStorage(Long storageId, StorageDto updatedStorage);

    void deleteStorage(Long storageId);
}
