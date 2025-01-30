package net.javahmproject.sms.repository;

import net.javahmproject.sms.entity.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StorageRepository extends JpaRepository<Storage, Long> {
    List<Storage> findByNameContainingOrCategoryIs(String name, String category);
}
