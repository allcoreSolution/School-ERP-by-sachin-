import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class TeacherHomeworkModel {
  final String id;
  final String subject;
  final String title;
  final String description;
  final String dueDate;
  final String attachment;

  TeacherHomeworkModel({
    required this.id,
    required this.subject,
    required this.title,
    required this.description,
    required this.dueDate,
    this.attachment = '',
  });
}

class TeacherDataRepository extends ChangeNotifier {
  static final TeacherDataRepository instance = TeacherDataRepository._();
  TeacherDataRepository._();

  // Dynamic Homework List
  final List<TeacherHomeworkModel> _assignedHomework = [];
  List<TeacherHomeworkModel> get assignedHomework => List.unmodifiable(_assignedHomework);

  Future<void> fetchAssignedHomework() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('sp_teacher_token') ?? '';
      
      final response = await http.get(
        Uri.parse('https://all-core-school-erp-backend.onrender.com/api/homework'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final body = jsonDecode(response.body);
        if (body['success'] == true && body['data'] != null) {
          _assignedHomework.clear();
          for (var item in body['data']) {
            _assignedHomework.add(TeacherHomeworkModel(
              id: item['_id']?.toString() ?? '',
              subject: item['subject']?.toString() ?? 'General',
              title: item['title']?.toString() ?? 'Homework',
              description: item['description']?.toString() ?? '',
              dueDate: item['submissionDate']?.toString() ?? '',
              attachment: item['attachment']?.toString() ?? '',
            ));
          }
          notifyListeners();
        }
      }
    } catch (e) {
      debugPrint('Error fetching teacher homework: $e');
    }
  }

  Future<void> assignHomework({
    required String title,
    required String description,
    required String submissionDate,
  }) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('sp_teacher_token') ?? '';
      
      final response = await http.post(
        Uri.parse('https://all-core-school-erp-backend.onrender.com/api/homework/assign'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'title': title,
          'description': description,
          'submissionDate': submissionDate,
          'subject': 'General', 
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        await fetchAssignedHomework();
      }
    } catch (e) {
      debugPrint('Error assigning homework: $e');
    }
  }

  // Teacher Submit Class Attendance
  Future<bool> submitAttendance({
    required String classId,
    required String sectionId,
    required List<Map<String, dynamic>> attendanceData,
  }) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('sp_teacher_token') ?? '';
      
      final String date = DateTime.now().toIso8601String().split('T')[0];

      // Format data as per backend requirements: 
      // [{ student, date, status, academicClass, section, remarks }]
      final List<Map<String, dynamic>> payload = attendanceData.map((s) => {
        'student': s['studentId'],
        'date': date,
        'status': s['status'],
        'academicClass': classId,
        'section': sectionId,
        'remarks': ''
      }).toList();

      final response = await http.post(
        Uri.parse('https://all-core-school-erp-backend.onrender.com/api/attendance/mark'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(payload),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return true;
      }
      return false;
    } catch (e) {
      debugPrint('Error submitting attendance: $e');
      return false;
    }
  }

  // Generic Leave applications etc can be added here
}
