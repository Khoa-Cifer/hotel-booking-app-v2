package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.model.BookedRoom;

import java.util.List;

public interface IBookedRoomService {
    List<BookedRoom> getAllBookingsByRoomId(Long id);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();

    String saveBooking(Long id, BookedRoom bookingRequest);

    void cancelBooking(Long id);
}
