from django.test import TestCase


class HealthTests(TestCase):
    def test_health(self):
        for url in ('/api/health', '/api/health/'):
            with self.subTest(url=url):
                response = self.client.get(url)

                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.json(), {'status': 'ok'})
