import 'package:flutter_test/flutter_test.dart';
import 'package:studets_app/main.dart';

void main() {
  testWidgets('App loads cleanly test', (WidgetTester tester) async {
    await tester.pumpWidget(const StudentsApp());
    await tester.pump(const Duration(seconds: 3));
    await tester.pumpAndSettle();
    expect(find.byType(StudentsApp), findsOneWidget);
  });
}
