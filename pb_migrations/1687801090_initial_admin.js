// pb_migrations/1687801090_initial_admin.js
migrate(
  (db) => {
    const dao = new Dao(db);

    const admin = new Admin();
    admin.email = "admin@admin.com";
    admin.setPassword("1234567890");

    dao.saveAdmin(admin);
  },
  (db) => {
    // optional revert
    const dao = new Dao(db);

    try {
      const admin = dao.findAdminByEmail("admin@admin.com");

      dao.deleteAdmin(admin);
    } catch (_) {
      /* most likely already deleted */
    }
  }
);
