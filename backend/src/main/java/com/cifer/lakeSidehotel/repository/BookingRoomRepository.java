package com.cifer.lakeSidehotel.repository;

import com.cifer.lakeSidehotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRoomRepository extends JpaRepository<BookedRoom, Long> {
    List<BookedRoom> findByRoomId(Long id);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);
}
