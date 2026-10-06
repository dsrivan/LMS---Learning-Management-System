ALTER TABLE users
    ADD COLUMN first_name VARCHAR(100),
    ADD COLUMN last_name VARCHAR(100),
    ADD COLUMN birth_date DATE,
    ADD COLUMN phone VARCHAR(30);

UPDATE users
SET
    first_name = CASE
                     WHEN role = 'ADMIN' THEN 'Admin'
                     ELSE 'Test'
        END,
    last_name = CASE
                    WHEN role = 'ADMIN' THEN 'Learning'
                    ELSE 'Student'
        END,
    birth_date = CASE
                     WHEN role = 'ADMIN' THEN DATE '1990-01-01'
                     ELSE DATE '2000-01-01'
        END,
    phone = '000000000'
WHERE first_name IS NULL;

ALTER TABLE users
    ALTER COLUMN first_name SET NOT NULL,
ALTER COLUMN last_name SET NOT NULL,
    ALTER COLUMN birth_date SET NOT NULL,
    ALTER COLUMN phone SET NOT NULL;

ALTER TABLE enrollments
DROP CONSTRAINT fk_enrollments_student;

ALTER TABLE enrollments
    ADD CONSTRAINT fk_enrollments_student
        FOREIGN KEY (student_id) REFERENCES users (id);

DROP TABLE students;