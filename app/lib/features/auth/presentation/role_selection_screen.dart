import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../core/theme/theme_provider.dart';

class RoleSelectionScreen extends StatefulWidget {
  const RoleSelectionScreen({super.key});

  @override
  State<RoleSelectionScreen> createState() => _RoleSelectionScreenState();
}

class _RoleSelectionScreenState extends State<RoleSelectionScreen> {
  DateTime? _lastBackPressTime;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) return;
        final now = DateTime.now();
        if (_lastBackPressTime == null || now.difference(_lastBackPressTime!) > const Duration(seconds: 2)) {
          _lastBackPressTime = now;
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Press back again to exit Campus App'),
              duration: Duration(seconds: 2),
              behavior: SnackBarBehavior.floating,
              backgroundColor: Color(0xFF2563EB),
            ),
          );
        } else {
          SystemNavigator.pop();
        }
      },
      child: Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F172A) : const Color(0xFFF8FAFF),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(
              isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
              color: isDark ? const Color(0xFFF59E0B) : const Color(0xFF6366F1),
              size: 24,
            ),
            tooltip: 'Toggle Theme',
            onPressed: () => ThemeProvider.instance.toggleTheme(!isDark),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 10),

              // School Logo & Header Animation
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF2563EB).withValues(alpha: 0.12),
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: const Color(0xFF2563EB).withValues(alpha: 0.3),
                    width: 2,
                  ),
                ),
                child: const Icon(
                  Icons.school_rounded,
                  color: Color(0xFF2563EB),
                  size: 48,
                ),
              ).animate().scale(duration: 400.ms, curve: Curves.easeOutBack),

              const SizedBox(height: 16),

              Text(
                'Campus ERP Smart Portal',
                style: GoogleFonts.outfit(
                  fontSize: 26,
                  fontWeight: FontWeight.w900,
                  color: isDark ? Colors.white : const Color(0xFF0F172A),
                  letterSpacing: -0.5,
                ),
              ).animate().fadeIn(duration: 350.ms, delay: 100.ms),

              const SizedBox(height: 6),

              Text(
                'Select your portal to log into Campus ERP Platform',
                textAlign: TextAlign.center,
                style: GoogleFonts.inter(
                  fontSize: 13.5,
                  fontWeight: FontWeight.w500,
                  color: isDark ? const Color(0xFF94A3B8) : const Color(0xFF64748B),
                ),
              ).animate().fadeIn(duration: 350.ms, delay: 150.ms),

              const SizedBox(height: 32),

              // 1. Student Portal Card (Blue)
              _buildRoleCard(
                context,
                title: 'Student Portal',
                subtitle: 'Homework, Timetable, Attendance, Fee Status & Digital ID Card',
                icon: Icons.school_rounded,
                gradientColors: isDark
                    ? [const Color(0xFF1E3A8A), const Color(0xFF2563EB)]
                    : [const Color(0xFF2563EB), const Color(0xFF3B82F6)],
                accentColor: const Color(0xFF60A5FA),
                badgeText: 'STUDENT PORTAL',
                onTap: () => context.push('/login'),
                isDark: isDark,
              ).animate().fadeIn(duration: 400.ms, delay: 200.ms).slideY(begin: 0.15),

              const SizedBox(height: 18),

              // 2. Teacher Portal Card (Purple Theme Swapped from Staff)
              _buildRoleCard(
                context,
                title: 'Teacher Portal',
                subtitle: 'Classroom Attendance, Homework Publishing, Marks Entry & Material',
                icon: Icons.psychology_rounded,
                gradientColors: isDark
                    ? [const Color(0xFF3B0764), const Color(0xFF4C1D95)]
                    : [const Color(0xFF4C1D95), const Color(0xFF7C3AED)],
                accentColor: const Color(0xFFA78BFA),
                badgeText: 'TEACHER PORTAL',
                onTap: () => context.push('/teacher-login'),
                isDark: isDark,
              ).animate().fadeIn(duration: 400.ms, delay: 300.ms).slideY(begin: 0.15),

              const SizedBox(height: 18),

              // 3. Employee Portal Card (Emerald Green Theme)
              _buildRoleCard(
                context,
                title: 'Employee Portal',
                subtitle: 'Mark Attendance, Leave Requests, Monthly Payslips & Employee ID',
                icon: Icons.badge_rounded,
                gradientColors: isDark
                    ? [const Color(0xFF064E3B), const Color(0xFF059669)]
                    : [const Color(0xFF047857), const Color(0xFF10B981)],
                accentColor: const Color(0xFF34D399),
                badgeText: 'EMPLOYEE PORTAL',
                onTap: () => context.push('/staff-login'),
                isDark: isDark,
              ).animate().fadeIn(duration: 400.ms, delay: 400.ms).slideY(begin: 0.15),

              const SizedBox(height: 18),

              // 4. Driver Portal Card (Deep Amber/Orange Theme)
              _buildRoleCard(
                context,
                title: 'Driver Portal',
                subtitle: 'Live GPS Location Tracking, Bus Routes, Route Contacts & Driver Profile',
                icon: Icons.directions_bus_rounded,
                gradientColors: isDark
                    ? [const Color(0xFF7C2D12), const Color(0xFFEA580C)]
                    : [const Color(0xFFC2410C), const Color(0xFFF97316)],
                accentColor: const Color(0xFFFDBA74),
                badgeText: 'DRIVER PORTAL',
                onTap: () => context.push('/driver-login'),
                isDark: isDark,
              ).animate().fadeIn(duration: 400.ms, delay: 500.ms).slideY(begin: 0.15),

              const SizedBox(height: 28),

              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.lock_outline_rounded,
                    size: 14,
                    color: isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8),
                  ),
                  const SizedBox(width: 6),
                  Text(
                    '256-Bit Encrypted School ERP Access',
                    style: GoogleFonts.inter(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w600,
                      color: isDark ? const Color(0xFF64748B) : const Color(0xFF94A3B8),
                    ),
                  ),
                ],
              ).animate().fadeIn(duration: 350.ms, delay: 500.ms),

              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    ),
    );
  }

  Widget _buildRoleCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required List<Color> gradientColors,
    required Color accentColor,
    required String badgeText,
    required VoidCallback onTap,
    required bool isDark,
  }) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: gradientColors[0].withValues(alpha: isDark ? 0.4 : 0.25),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(24),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(24),
          child: Ink(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: gradientColors,
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(
                color: Colors.white.withValues(alpha: 0.25),
                width: 1.5,
              ),
            ),
            child: Row(
              children: [
                // Icon Box
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(
                      color: Colors.white.withValues(alpha: 0.4),
                    ),
                  ),
                  child: Icon(
                    icon,
                    size: 32,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(width: 16),

                // Text Info
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          badgeText,
                          style: GoogleFonts.inter(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            letterSpacing: 0.3,
                          ),
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        title,
                        style: GoogleFonts.outfit(
                          fontSize: 20,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        subtitle,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.inter(
                          fontSize: 11.5,
                          fontWeight: FontWeight.w500,
                          color: Colors.white.withValues(alpha: 0.85),
                          height: 1.25,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(width: 8),

                // Arrow Circle Button
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.arrow_forward_rounded,
                    size: 18,
                    color: gradientColors[0],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
