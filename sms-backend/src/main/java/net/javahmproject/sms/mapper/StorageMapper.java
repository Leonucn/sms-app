package net.javahmproject.sms.mapper;

import net.javahmproject.sms.dto.StorageDto;
import net.javahmproject.sms.entity.Storage;

public class StorageMapper {

    public static StorageDto mapToStorageDto(Storage storage){
        return new StorageDto(
                storage.getId(),
                storage.getName(),
                storage.getCategory(),
                storage.getQuantity(),
                storage.getPurchaseDate()
        );
    }

    public static Storage mapToStorage(StorageDto storageDto){
        return new Storage(
                storageDto.getId(),
                storageDto.getName(),
                storageDto.getCategory(),
                storageDto.getQuantity(),
                storageDto.getPurchaseDate()
        );
    }
}
