import { Router } from "express";
import employees from "#db/employees";

const router = Router();

router.get("/", (req, res) => {
    res.send(employees);
});

router.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * employees.length);
    res.send(employees[randomIndex]);
});

router.get("/id", (req, res) => {
    const { id } = req.params;
    const employee = employees.find((e) => e.id === +id);

    if (!employee) {
        return res.status(404).send("Employee not found");
    }

    res.send(employee);
});

router.post("/", (req, res, next) => {
    try {
        const { body } = req;

        if (!body || !body.name || body.name.trim() === "") {
            return res.status(400).send("A non-empty 'name' field is required.");
        }

        const newId = employees.reduce((max, e) => Math.max(max, e.id), 0) +1;

        const newEmployee = { id: newId, name: body.name };
        employees.push(newEmployee);

        res.status(201).send(newEmployee);
    } catch (err) {
        next(err);
    }
});

export default router;