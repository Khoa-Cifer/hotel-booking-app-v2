package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.exception.InvalidBookingRequestException;
import com.cifer.lakeSidehotel.exception.ResourceNotFoundException;
import com.cifer.lakeSidehotel.model.BookedRoom;
import com.cifer.lakeSidehotel.model.Room;
import com.cifer.lakeSidehotel.repository.BookingRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedRoomService {
    private final BookingRoomRepository repository;
    private final IRoomService roomService;

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return repository.findByRoomId(id);
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return repository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("No booking found with booking code: " + confirmationCode));
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return repository.findAll();
    }

    @Override
    public String saveBooking(Long id, BookedRoom bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(id).get();
        List<BookedRoom> existingBookingRooms = room.getBookings();
        boolean roomAvailable = roomIsAvailable(bookingRequest, existingBookingRooms);
        if (roomAvailable) {
            room.addBooking(bookingRequest);
            repository.save(bookingRequest);
        } else {
            throw new InvalidBookingRequestException("This has been booked for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookingRooms) {
        return existingBookingRooms.stream()
                .noneMatch(existingBookingRoom ->
                        bookingRequest.getCheckInDate().equals(existingBookingRoom.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBookingRoom.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBookingRoom.getCheckInDate())

                                && bookingRequest.getCheckInDate().isBefore(existingBookingRoom.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBookingRoom.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBookingRoom.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBookingRoom.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBookingRoom.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBookingRoom.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBookingRoom.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBookingRoom.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public void cancelBooking(Long id) {
        repository.deleteById(id);
    }
}
