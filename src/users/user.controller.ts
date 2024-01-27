import { Body, Controller, Get } from "@nestjs/common";
import { Role } from "src/roles/role.enum";
import { Roles } from "src/roles/roles.decorator";

@Controller('user')
export class UserController {

    @Get()
    @Roles(Role.Admin)
    create(@Body() createCatDto : any) {
        return "cat created";
    }
}